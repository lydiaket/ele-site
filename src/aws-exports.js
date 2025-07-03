const awsExports = {
  Auth: {
    region: "us-east-2",
    userPoolId: "us-east-2_qFqFIbjDz",
    userPoolWebClientId: "6p72lr2g6tg5pv16cci9j7m5ov",
    oauth: {
      domain: "us-east-2qfqfibjdz.auth.us-east-2.amazoncognito.com",
      scope: ["openid", "email", "phone", "profile"],
      redirectSignIn: "http://localhost:3000/",
      redirectSignOut: "http://localhost:3000/",
      responseType: "code",
    },
  },
};

export default awsExports;
