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

import java.io.*;
import java.nio.file.Path;
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
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
      //   fileName = "Login.jpg";
      //  return new ResponseEntity<>(service.uploadFile(fileName, file), HttpStatus.OK);

     String   fileName = file.getOriginalFilename();
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
    public ResponseEntity<String> downloadFile(@RequestParam String keyName) throws Exception {
        HttpHeaders httpHeaders= new HttpHeaders();
        //System.setProperty("Login-Bg.jpg","expert3d/uuid_1694518453/output/output_3d_0.obj");
        String outputFile = System.getProperty(keyName);

        String outputFileName= outputFile.substring(outputFile.lastIndexOf("/")+1,outputFile.length());
        ByteArrayResource byteArrayResource = service.downloadFile(keyName);
        System.out.println("Byte array received for output file");
        File localOutputFile = new File(System.getProperty("java.io.tmpdir")+ File.separator+outputFileName);
        System.out.println("outfile path is "+localOutputFile);
        OutputStream os = new FileOutputStream(localOutputFile);
        os.write(byteArrayResource.getByteArray());
        os.close();
        System.out.println("File save check");
        httpHeaders.set("content-disposition", "attachment; fileName = " + outputFileName);
        return new ResponseEntity<>(localOutputFile.getAbsolutePath(),httpHeaders, HttpStatus.OK);

      //  return new ResponseEntity<ByteArrayResource>(service.downloadFile("Login-Bg.jpg"), HttpStatus.OK);
    }

    @GetMapping("/preview")
    public ResponseEntity<ByteArrayResource> previewFile(@RequestParam String keyName) throws Exception {
        HttpHeaders httpHeaders= new HttpHeaders();

        System.out.println("File to download: " + keyName);
        return new ResponseEntity<ByteArrayResource>(service.downloadFile(keyName),HttpStatus.OK);


    }


}