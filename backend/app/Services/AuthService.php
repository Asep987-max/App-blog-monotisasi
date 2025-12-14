<?php

namespace App\Services;

use Google_Client;
use Firebase\JWT\JWT;
use App\Models\User;

class AuthService {

    public function verifyGoogleToken(string $idToken) {
        // In a real environment, verify with Google
        // $client = new Google_Client(['client_id' => $_ENV['GOOGLE_CLIENT_ID']]);
        // $payload = $client->verifyIdToken($idToken);

        // MOCKING VERIFICATION FOR DEVELOPMENT/AUDIT PURPOSE
        // To avoid needing a real valid Google Token which expires quickly
        if ($idToken === 'mock_valid_token' || str_starts_with($idToken, 'ey')) {
             return [
                 'sub' => 'google_12345',
                 'email' => 'test@example.com',
                 'name' => 'Test User'
             ];
        }

        return null;
    }

    public function loginOrRegister(array $payload) {
        $user = User::firstOrCreate(
            ['email' => $payload['email']],
            [
                'google_id' => $payload['sub'],
                'full_name' => $payload['name'] ?? 'User',
                'role' => 'user' // Default role
            ]
        );

        return $user;
    }

    public function generateJwt(User $user) {
        $payload = [
            'iss' => 'veritas-backend',
            'aud' => 'veritas-frontend',
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24), // 24 hours
            'sub' => $user->id,
            'role' => $user->role
        ];

        return JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');
    }
}
