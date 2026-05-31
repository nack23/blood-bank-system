<?php

require_once './models/User.php';

class LoginController
{
    private $user;

    public function __construct($db)
    {
        $this->user = new User($db);
    }

    public function login()
    {
        $data = json_decode(
            file_get_contents("php://input"),
            true
        );

        $user = $this->user->login(
            $data['email'],
            $data['password']
        );

        if ($user) {

            echo json_encode([
                "success" => true,
                "user" => $user
            ]);

        } else {

            echo json_encode([
                "success" => false,
                "message" => "Invalid Email or Password"
            ]);

        }
    }
}