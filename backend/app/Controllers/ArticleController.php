<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Article;
use App\Models\Category;

class ArticleController {

    // GET /api/articles
    public function index(Request $request, Response $response) {
        $params = $request->getQueryParams();

        $query = Article::with(['user', 'category'])->where('status', 'published');

        // Filter by Category
        if (isset($params['category'])) {
            $categorySlug = $params['category'];
            $query->whereHas('category', function($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        // Search
        if (isset($params['search'])) {
            $search = $params['search'];
            $query->where('title', 'LIKE', "%{$search}%");
        }

        // Pagination
        $perPage = 10;
        $page = $params['page'] ?? 1;

        // Use Eloquent Pagination
        // Note: illuminate/database standalone paginator setup is complex,
        // so we do simple offset/limit for this integration task.
        $total = $query->count();
        $articles = $query->skip(($page - 1) * $perPage)->take($perPage)->orderBy('created_at', 'desc')->get();

        $response->getBody()->write(json_encode([
            'data' => $articles,
            'meta' => [
                'current_page' => (int)$page,
                'last_page' => ceil($total / $perPage),
                'total' => $total
            ]
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // GET /api/articles/{slug}
    public function show(Request $request, Response $response, $args) {
        $slug = $args['slug'];
        $article = Article::with(['user', 'category'])->where('slug', $slug)->first();

        if (!$article) {
            $response->getBody()->write(json_encode(['error' => 'Article not found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        // Increment Views
        $article->increment('views');

        $response->getBody()->write(json_encode($article));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // POST /api/articles (Protected)
    public function store(Request $request, Response $response) {
        $user = $request->getAttribute('user');

        // Basic Authorization Check (Admin or Author only)
        if (!in_array($user['role'], ['admin', 'author'])) {
             $response->getBody()->write(json_encode(['error' => 'Forbidden']));
             return $response->withHeader('Content-Type', 'application/json')->withStatus(403);
        }

        $data = $request->getParsedBody();

        // Basic Validation
        if (empty($data['title']) || empty($data['category_id'])) {
             $response->getBody()->write(json_encode(['error' => 'Validation Error']));
             return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        try {
            $article = new Article();
            $article->title = $data['title'];
            $article->slug = $data['slug'] ?? \Illuminate\Support\Str::slug($data['title']) . '-' . time();
            $article->content = $data['content'] ?? '';
            $article->excerpt = $data['excerpt'] ?? '';
            $article->category_id = $data['category_id'];
            $article->user_id = $user['sub'];
            $article->status = $data['status'] ?? 'draft';
            $article->cover_image_url = $data['cover_image_url'] ?? null;
            $article->save();

            $response->getBody()->write(json_encode($article));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }
}
