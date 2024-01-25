document.addEventListener('DOMContentLoaded', async () => {

    const signResponse = await fetch('/api/signuploadform');
    const signData = await signResponse.json();

    const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const files = document.querySelector("[type=file]").files;
        const formData = new FormData();
    
        // Append parameters to the form data. The parameters that are signed using 
        // the signing function (signuploadform) need to match these.
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            formData.append("file", file);
            formData.append("api_key", signData.apikey);
            formData.append("timestamp", signData.timestamp);
            formData.append("signature", signData.signature);
            formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
            formData.append("folder", "signed_upload_demo_form");
    
            fetch(url, {
                method: "POST",
                body: formData
            })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                console.log(JSON.parse(data))
                var str = JSON.stringify(JSON.parse(data), null, 4);
                document.getElementById("formdata").innerHTML += str;
            });
        }
    });

})

cloudinary.uploader.image_upload_tag(
    'image_id', { html: { multiple: 1 } });
    $('.cloudinary-fileupload').bind('cloudinarydone', function(e, data) {  
        $('.preview').html(
          $.cloudinary.image(data.result.public_id, 
            { format: data.result.format, version: data.result.version, 
              crop: 'fill', width: 150, height: 100 })
        );    
        $('.image_public_id').val(data.result.public_id);    
        return true;
      });
      $('.cloudinary-fileupload').bind('fileuploadprogress', function(e, data) { 
        $('.progress_bar').css('width', Math.round((data.loaded * 100.0) / data.total) + '%'); 
      });
      cloudinary.uploader.image_upload_tag('image_id', 
  { return_delete_token: 1 });
  $.cloudinary.delete_by_token(delete_token)