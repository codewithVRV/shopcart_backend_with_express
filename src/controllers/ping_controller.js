function pingController(request, response) {
    return response.json({message: 'OK from V1 API'});
}

function pingAuthCheck (request, response) {
    return response.json({message: 'OK from pingAuthCheck'});

}

function pingControllerV2(request, response) {
    return response.json({message: 'OK from V2 API'});
}



module.exports = {
    pingController,
    pingControllerV2,
    pingAuthCheck,
}