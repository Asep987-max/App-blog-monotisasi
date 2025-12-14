<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\AuthService;

class AuthController {
    private $authService;

    public function __construct(AuthService $authService) {
        $this->authService = $authService;
    }

    public function googleLogin(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $idToken = $data['id_token'] ?? '';

        if (!$idToken) {
            $response->getBody()->write(json_encode(['error' => 'Missing id_token']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        $payload = $this->authService->verifyGoogleToken($idToken);

        if ($payload) {
            $user = $this->authService->loginOrRegister($payload);
            $token = $this->authService->generateJwt($user);

            $response->getBody()->write(json_encode([
                'token' => $token,
                'user' => $user
            ]));
            return $response->withHeader('Content-Type', 'application/json');
        } else {
            $response->getBody()->write(json_encode(['error' => 'Invalid Token']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        }
    }
}
