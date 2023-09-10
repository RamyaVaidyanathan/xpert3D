package com.example.springbootawss3.controller;

import com.example.springbootawss3.service.S3BucketStorageService;
//import org.apache.commons.io.output.ByteArrayOutputStream;
//import java.io.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.List;

@RestController
public class S3BucketStorageController {
    @Autowired
    S3BucketStorageService service;

    @GetMapping("/list/files")
    public ResponseEntity<List<String>> getListOfFiles() {
        return new ResponseEntity<>(service.listFiles(), HttpStatus.OK);
    }

    @PostMapping(value = "/file/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadFile(@RequestParam("fileName") String fileName,
                                             @RequestParam("file") MultipartFile file) {
      //   fileName = "Login.jpg";
      //  return new ResponseEntity<>(service.uploadFile(fileName, file), HttpStatus.OK);

      //  fileName = file.getOriginalFilename();
        System.out.println("filename: " + fileName);
        String message = "";
    /*
        try{
             service.uploadFile(fileName, file.getInputStream());
                message = "Your file has been uploaded successfully!";
            }catch(Exception ex) {
                message = "Error uploading file: " + ex.getMessage();
            }
    */

        return new ResponseEntity<>(service.uploadFile(fileName, file), HttpStatus.OK);
    }

    @GetMapping("/download")
    public ResponseEntity<ByteArrayResource> downloadFile(@RequestParam String keyName) {
        HttpHeaders httpHeaders= new HttpHeaders();
        httpHeaders.set("content-disposition", "attachment; fileName = " + keyName);
        return new ResponseEntity<>(service.downloadFile(keyName),httpHeaders, HttpStatus.OK);

      //  return new ResponseEntity<ByteArrayResource>(service.downloadFile("Login-Bg.jpg"), HttpStatus.OK);
    }

}