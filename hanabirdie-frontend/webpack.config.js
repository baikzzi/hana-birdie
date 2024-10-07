module.exports = {
  resolve: {
    fallback: {
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      querystring: require.resolve("querystring-es3"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
      fs: false, // 브라우저 환경에서 fs는 사용 불가능하므로 false로 설정
      net: false, // 브라우저에서 네트워크 관련 모듈은 사용할 수 없으므로 false로 설정
      tls: false, // 브라우저에서 TLS는 사용할 수 없으므로 false로 설정
      child_process: false, // 브라우저에서 사용할 수 없으므로 false로 설정
    },
  },
};
