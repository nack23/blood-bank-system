<?php

require_once './models/User.php';

class AuthController
{
    private $user;

    public function __construct($db)
    {
        $this->user = new User($db);
    }

    public function register()
    {
        $data = json_decode(
            file_get_contents("php://input"),
            true
        );

        if (!$data) {
            echo json_encode([
                "success" => false,
                "message" => "No data received"
            ]);
            return;
        }

        $result = $this->user->register(
            $data['name'],
            $data['email'],
            $data['password'],
            $data['role'],
            $data['blood_group'] ?? null
        );

        if ($result === true) {
            echo json_encode([
                "success" => true,
                "message" => "Registration Successful"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => $result
            ]);
        }
    }
}