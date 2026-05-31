<?php

require_once './models/Request.php';

class RequestController
{
    private $request;

    public function __construct($db)
    {
        $this->request = new Request($db);
    }

   public function sendRequest()
{
    $data = json_decode(
        file_get_contents("php://input"),
        true
    );

    $result = $this->request->sendRequest(
        $data['receiver_id'],
        $data['sample_id'],
        $data['units']
    );

    echo json_encode([
        "success" => $result
    ]);
}

   public function getRequests()
{
    $data = json_decode(
        file_get_contents("php://input"),
        true
    );

    echo json_encode(
        $this->request->getRequests(
            $data['hospital_id']
        )
    );
}

    public function approveRequest()
{
    $data = json_decode(
        file_get_contents("php://input"),
        true
    );

    $result =
        $this->request->approveRequest(
            $data['id']
        );

    echo json_encode([
        "success" => $result
    ]);
}

    public function rejectRequest()
    {
        $data = json_decode(
            file_get_contents("php://input"),
            true
        );

        echo json_encode([
            "success" =>
            $this->request->rejectRequest(
                $data['id']
            )
        ]);
    }

    public function getReceiverRequests()
{
    $data = json_decode(
        file_get_contents("php://input"),
        true
    );

    echo json_encode(
        $this->request->getReceiverRequests(
            $data['receiver_id']
        )
    );
}
}