const configuration:any = {
  port: process.env.PORT || 3000,
  mongodbUrl: process.env.MONGODB_URL || "mongodb://localhost:27017/",
};

export default configuration;