package com.example.springbootawss3.service;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class S3BucketStorageService {

    private Logger logger = LoggerFactory.getLogger(S3BucketStorageService.class);

    @Autowired
    private AmazonS3 amazonS3Client;

    @Value("${application.bucket.name}")
    private String bucketName;

    /**
     * Upload file into AWS S3
     *
     * @param fileName
     * @param file
     * @return String
     */
    public String uploadFile(String fileName, MultipartFile file) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            String rootPath = "expert3d/uuid_" + getEpoc() ;
            String keyName = rootPath + "/input/" + fileName;
            System.setProperty(fileName, rootPath + "/output/output_3d_0.obj") ;
            amazonS3Client.putObject(bucketName, keyName, file.getInputStream(), metadata);
            return "File uploaded: " + keyName;
        } catch (IOException ioe) {
            logger.error("IOException: " + ioe.getMessage());
        } catch (AmazonServiceException serviceException) {
            logger.info("AmazonServiceException: "+ serviceException.getMessage());
            throw serviceException;
        } catch (AmazonClientException clientException) {
            logger.info("AmazonClientException Message: " + clientException.getMessage());
            throw clientException;
        }
        return "File not uploaded: " + fileName;
    }

    /**
     * Deletes file from AWS S3 bucket
     *
     * @param fileName
     * @return
     */
    public String deleteFile(final String fileName) {
        amazonS3Client.deleteObject(bucketName, fileName);
        return "Deleted File: " + fileName;
    }


    /**
     * Downloads file using amazon S3 client from S3 bucket
     *
     * @param fileName
     * @return ByteArrayOutputStream
     */
    public ByteArrayResource downloadFile(String fileName) {
        try {

            System.out.println("fileName to download: " + fileName);
            String outputPath = System.getProperty(fileName);
            System.out.println("outputPath: " + outputPath);
            S3Object s3object = amazonS3Client.getObject(new GetObjectRequest(bucketName, outputPath));

            InputStream is = s3object.getObjectContent();
            ByteArrayResource outputResource = new ByteArrayResource(is.readAllBytes());
            System.out.println("returning response ");
            return outputResource;
        } catch (IOException ioException) {
            logger.error("IOException: " + ioException.getMessage());
        } catch (AmazonServiceException serviceException) {
            logger.info("AmazonServiceException Message:    " + serviceException.getMessage());
            throw serviceException;
        } catch (AmazonClientException clientException) {
            logger.info("AmazonClientException Message: " + clientException.getMessage());
            throw clientException;
        }

        return null;
    }

    /**
     * Get all files from S3 bucket
     *
     * @return
     */
    public List<String> listFiles() {

        ListObjectsRequest listObjectsRequest =
                new ListObjectsRequest()
                        .withBucketName(bucketName);

        List<String> keys = new ArrayList<>();

        ObjectListing objects = amazonS3Client.listObjects(listObjectsRequest);

        while (true) {
            List<S3ObjectSummary> objectSummaries = objects.getObjectSummaries();
            if (objectSummaries.size() < 1) {
                break;
            }

            for (S3ObjectSummary item : objectSummaries) {
                if (!item.getKey().endsWith("/"))
                    keys.add(item.getKey());
                System.out.println( "bucket key: " + item.getKey()  );
            }

            objects = amazonS3Client.listNextBatchOfObjects(objects);
        }

        return keys;
    }

    public String getEpoc() {

        long currentTimeMillis = System.currentTimeMillis();

        // Convert milliseconds to seconds (divide by 1000)
        long epochTimeInSeconds = currentTimeMillis / 1000;

     //   System.out.println("Epoch Time (in seconds): " + epochTimeInSeconds);
        return String.valueOf(epochTimeInSeconds);
    }


}
