<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\AdPlacement;

class AdPlacementController {

    // GET /api/ads
    public function index(Request $request, Response $response) {
        // Cache logic would go here (Redis)
        // For now, direct DB
        $ads = AdPlacement::where('is_active', true)->get();

        $response->getBody()->write(json_encode($ads));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // PUT /api/admin/ads/{id} (Admin Only)
    public function update(Request $request, Response $response, $args) {
        $user = $request->getAttribute('user');

        if ($user['role'] !== 'admin') {
             $response->getBody()->write(json_encode(['error' => 'Forbidden']));
             return $response->withHeader('Content-Type', 'application/json')->withStatus(403);
        }

        $id = $args['id'];
        $ad = AdPlacement::find($id);

        if (!$ad) {
            $response->getBody()->write(json_encode(['error' => 'Ad Placement not found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $data = $request->getParsedBody();

        if (isset($data['ad_code'])) {
            $ad->ad_code = $data['ad_code'];
        }
        if (isset($data['is_active'])) {
            $ad->is_active = (bool)$data['is_active'];
        }

        $ad->save();

        $response->getBody()->write(json_encode($ad));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
