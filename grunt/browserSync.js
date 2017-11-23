module.exports = {
  bsFiles: {
    src: [
      'public/build/**',
      'server/views/**',
      '!public/build/**/*.map',
    ],
  },
  options: {
    proxy: 'localhost:3000',
  },
};
