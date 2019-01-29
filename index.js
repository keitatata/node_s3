var s3 = require('s3');

var client = s3.createClient({
  maxAsyncS3: 20,
  s3RetryCount: 3,
  s3RetryDelay: 1000,
  multipartUploadThreshold: 20971520,
  multipartUploadSize: 15728640,
  s3Options: {
    accessKeyId: "xxxxxxxxxxxxx",
    secretAccessKey: "xxxxxxxxxxxxxx",
  },
});

function genImgName () {
  var l = 8;
  var word = "abcdefghijklmnopqrstuvwxyz0123456789";
  var wordLength = word.length;
  var r = "";
  for(var i=0; i<l; i++){
    r += word[Math.floor(Math.random()*wordLength)];
  }
  return r
}

var params = {
  localFile: "img/sample.png",
  s3Params: {
    Bucket: "udemy-aws-14days-s3-sample8",
    Key: "upload/" + genImgName() + ".png",
  },
};
var uploader = client.uploadFile(params);
uploader.on('error', function(err) {
  console.error("unable to upload:", err.stack);
});
uploader.on('progress', function() {
  console.log("progress", uploader.progressMd5Amount,
    uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
  console.log("done uploading");
});