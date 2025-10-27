function notFoundMiddleware(req: any, res: any, next: any) {
    res.status(404).send('Route not found');
}

export default notFoundMiddleware;