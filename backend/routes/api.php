<?php

require_once './controllers/RegisterController.php';
require_once './controllers/LoginController.php';
require_once './controllers/BloodSampleController.php';
require_once './controllers/RequestController.php';

$data = json_decode(
    file_get_contents("php://input"),
    true
);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (
        isset($data['action']) &&
        $data['action'] === 'login'
    ) {

        $login = new LoginController($conn);
        $login->login();
    }

    elseif (
        isset($data['action']) &&
        $data['action'] === 'add_blood'
    ) {

        $sample = new BloodSampleController($conn);
        $sample->addSample();
    }

    elseif (
        isset($data['action']) &&
        $data['action'] === 'get_blood_samples'
    ) {

        $sample = new BloodSampleController($conn);
        $sample->getBloodSamples();
    }

    elseif (
        isset($data['action']) &&
        $data['action'] === 'send_request'
    ) {

        $request = new RequestController($conn);
        $request->sendRequest();
    }

    elseif (
        isset($data['action']) &&
        $data['action'] === 'get_requests'
    ) {

        $request = new RequestController($conn);
        $request->getRequests();
    }

    elseif (
    isset($data['action']) &&
    $data['action'] === 'get_receiver_requests'
) {

    $request = new RequestController($conn);
    $request->getReceiverRequests();
}

    elseif (
        isset($data['action']) &&
        $data['action'] === 'approve_request'
    ) {

        $request = new RequestController($conn);
        $request->approveRequest();
    }

    elseif (
        isset($data['action']) &&
        $data['action'] === 'reject_request'
    ) {

        $request = new RequestController($conn);
        $request->rejectRequest();
    }

    else {

        $register = new RegisterController($conn);
        $register->register();
    }
}