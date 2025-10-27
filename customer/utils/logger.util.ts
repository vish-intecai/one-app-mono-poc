import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";

function requestLogger(req: Request, res: Response, next: NextFunction) {
    const logsPath = path.join(__dirname, "../logs");
    const startHrTime = process.hrtime();
  
    let bodyData = "";
    try {
      bodyData = JSON.stringify(req.body);
    } catch {
      bodyData = "Unserializable";
    }
  
    // To capture the response body, we override res.send
    const originalSend = res.send;
    const chunks: any[] = [];
    res.send = function (chunk: any) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      return originalSend.call(this, chunk);
    };
  
    res.on("finish", () => {
      const elapsedHrTime = process.hrtime(startHrTime);
      const elapsedMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
      const timestamp = new Date().toISOString();
  
      let responseBody = "";
      try {
        if (chunks.length) {
          responseBody = Buffer.concat(chunks).toString("utf8");
        }
      } catch {
        responseBody = "Unserializable";
      }
  
      // Prepare log entry
      const logEntry = {
        timestamp,
        method: req.method,
        url: req.originalUrl,
        requestBody: bodyData,
        responseBody,
        statusCode: res.statusCode,
        responseTimeMs: elapsedMs,
      };
  
      // Write log to daily log file
      const logFileName = path.join(logsPath, `${timestamp.substring(0, 10)}.log`);
      fs.appendFile(
        logFileName,
        JSON.stringify(logEntry, null, 2) + ",\n",
        (err) => {
          if (err) {
            console.error("[LOG ERROR]", err);
          }
        }
      );
    });
    
    next();
  }


  export default requestLogger;