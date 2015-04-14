define([
  'jquery',
  'underscore',
  'backbone',
  'collections/UserFiles',
  'text!templates/desktopTemplates/userDocumentsView.html',
  'text!templates/desktopTemplates/userDocumentRow.html'
], function($, _, Backbone, UserFiles, userDocumentsTemplate, userDocumentRowTemplate){
  var UserDocumentsView = Backbone.View.extend({
    el:".mainContentContainer",
    initialize: function (){},
    render: function(){console.log("in doc view");
      var that = this;
      var documents = new UserFiles();
      this.$el.html(_.template( userDocumentsTemplate, {}));
      documents.fetch({success:function(data){
          $(".userDocumentList").append(_.template( userDocumentRowTemplate, {data: data.models[0].attributes}));
      }});
    },
    events:{
      'click .AddNewDocument' : 'fnShowUploadForm',
      'click .EditDocument'   : 'fnShowEditForm',
      'click .DeleteDocument' : 'fnDeleteDocument',
      'click #closeDocForm'   : 'fnCloseDocForm',
      'click .UploadDocument' : 'fnUploadDocument',
      'click .docUploaded'    : 'fnDownloadFile'
    },
    fnShowUploadForm: function(e){
      if($(".EditDocumentForm").css("display","block")){
        $(".EditDocumentForm").css("display","none");
        $(".AddDocumentForm").slideDown();
      }else{
        $(".AddDocumentForm").slideDown();
      }
    },
    fnShowEditForm: function(e){
      if($(".AddDocumentForm").css("display","block")){
        $(".AddDocumentForm").css("display","none");
        $(".EditDocumentForm").slideDown();
      }else{
        $(".EditDocumentForm").slideDown();
      }
    },
    fnCloseDocForm:function(e){
      $(e.target).closest("div.docForm").slideUp();
    },
    fnDeleteDocument: function(e){

    },
    fnUploadDocument:function(e){
      var that = this;
      var formData = new FormData();
      formData.append('documentName', $("#documentName").val());
      formData.append('issueAuthority', $("#issueAuthority").val());
      formData.append('issueYear', $("#issueYear").val());
      formData.append('files', $("#fileToUpload")[0].files[0]);
      $.ajax({
         type: "POST",
         url:  "api/uploadDocument",
         data: formData,         
         enctype: 'multipart/form-data',
         contentType: false,
         processData: false,
         success: function(doc) {
            alert("Upload Succesfull");
            that.render();
         }
      });
    },
    fnDownloadFile: function(e){
      var data = new Object();
      data.file = $(e.target).html();
      $.ajax({
        type: "GET",
        url:  "api/downloadDocument",
        contentType: "arraybuffer",
        data: data,
        success:function(res){
          var BASE64_MARKER = ';base64,';
 
          function convertDataURIToBinary(dataURI) {
            var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
            var base64 = dataURI.substring(base64Index);
            var raw = window.atob(base64);
            var rawLength = raw.length;
            var array = new Uint8Array(new ArrayBuffer(rawLength));
           
            for(i = 0; i < rawLength; i++) {
              array[i] = raw.charCodeAt(i);
            }
            return array;
          }
          var pdf = convertDataURIToBinary(res);
          PDFJS.getDocument(pdf).then(function getPdfHelloWorld(_pdfDoc) {
              var w = window.open("blank.html", "blank", "");
              w.document.write(_pdfDoc);
          });
          console.log(res)
            //doc.save('Test.pdf');
                      
            window.open(doc);
            // var blob = new Blob([res], {type: "application/pdf"});
            // console.log(blob);
            // url = URL.createObjectURL(res);
            var w = window.open("blank.html", "blank", "");
            w.document.write(b64toBlob(res));
            // window.open(url,"_blank");
            // window.open("data:application/pdf;base64" + escape(res)); 
        }
      });
    }
  });
  return UserDocumentsView;
});
