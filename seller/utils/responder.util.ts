class Responder {
  static successResponse(
    res: any,
    data: any,
    statusCode: number = 200
  ) {
    return res.status(statusCode).json({
      status: "success",
      data,
    });
  }

  static errorResponse(
    res: any,
    message: string = "",
    statusCode: number = 500,
    data?: any
  ) {
    const response: any = {
      status: "error",
      message,
    };
    if (data) {
      response.data = data;
    }
    return res.status(statusCode).json(response);
  }

}

export default Responder;