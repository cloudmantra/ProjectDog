define([
  'jquery',
  'underscore',
  'backbone',
  'jqueryFile',
  'collections/UserFiles',
  'text!templates/desktopTemplates/userDocumentsView.html',
  'text!templates/desktopTemplates/userDocumentRow.html'
], function($, _, Backbone, jqueryFile, UserFiles, userDocumentsTemplate, userDocumentRowTemplate){
  var UserDocumentsView = Backbone.View.extend({
    el:".mainContentContainer",
    initialize: function (){},
    render: function(){
      var that = this;
      var documents = new UserFiles();
      this.$el.html(_.template( userDocumentsTemplate, {}));
      documents.fetch({success:function(data){
          $(".userDocumentList").append(_.template( userDocumentRowTemplate, {data: data.models[0].attributes}));
      }});
    },
    events:{
      'click .AddNewDocument'       : 'fnShowUploadForm',
      'click .EditDocument'         : 'fnShowEditForm',
      'click .DeleteDocument'       : 'fnDeleteDocument',
      'click #closeDocForm'         : 'fnCloseDocForm',
      'click .UploadDocument'       : 'fnUploadDocument',
      'click .docUploaded'          : 'fnDownloadFile',
      'click .selectAll'            : 'fnSelectAllDoc',
      'click .deleteDocumentConfirm': 'fnDeleteConfirm',
      'click .deleteDocumentCancel' : 'fnCloseDialog',
      'click .deleteDocumentSelect' : 'fnCloseDialog'
    },
    fnSelectAllDoc:function(e){
      if($(e.target).prop("checked")){
        $(".selectDoc").prop("checked",true);
      }else{
        $(".selectDoc").prop("checked",false);
      }
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
      var data = {};
      data.file = [];
      $(".selectDoc:checked").each(function(index){
        data.file.push($(this).parent(".selectBox").siblings(".docUploaded").html());
      });
      if(data.file.length === 0){
        $(".popupContainer,.selectionDeleteDialog").show();
      }else{
        $(".deleteCount").html(data.file.length);
        $(".popupContainer,.confirmDeleteDialog").show();
      }
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
    fnDeleteConfirm:function(e){
      var data = {};
      data.files = [];
      var that = this;
      $(".selectDoc:checked").each(function(index){
        data.files.push($(this).parent(".selectBox").siblings(".docUploaded").html());
      });
      $(".deleteCount").html("");
      $(".popupContainer,.confirmDeleteDialog").hide();
      $.ajax({
         type: "GET",
         url:  "api/deleteDocument",
         data: data,
         success: function(doc) {
            that.render();
         }
      });
    },
    fnCloseDialog:function(e){
      if($(e.target).hasClass("deleteDocumentCancel")){
        $(".deleteCount").html("");
        $(".popupContainer,.confirmDeleteDialog").hide();
      }else{
        $(".popupContainer,.selectionDeleteDialog").hide();
      }
    },
    fnDownloadFile: function(e){
      var data = {};
      data.file = $(e.target).html();
      $.fileDownload('http://localhost:8080/api/downloadDocument',{
        httpMethod: 'GET',
        data: data
      });
    }
  });
  return UserDocumentsView;
});
