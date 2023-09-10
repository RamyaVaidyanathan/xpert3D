package com.example.springbootawss3.config;

import com.amazonaws.ClientConfiguration;
import com.amazonaws.Protocol;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsS3ClientConfig {

    @Value("${cloud.aws.credentials.accessKey}")
    private String awsId;

    @Value("${cloud.aws.credentials.secretKey}")
    private String awsKey;

    @Value("${cloud.aws.region.static}")
    private String region;

    @Value("${cloud.aws.credentials.sessiontoken}")
    private String sessionToken;

    @Bean
    public AmazonS3 s3client() {

        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(awsId, awsKey);
//        AmazonS3 amazonS3Client = AmazonS3ClientBuilder.standard()
//                .withRegion(Regions.fromName(region))
//                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
//                .build();

        AWSCredentials credentials = new BasicSessionCredentials(awsId,awsKey,sessionToken);
        ClientConfiguration config = new ClientConfiguration();
        config.setProtocol(Protocol.HTTP);
        config.setSignerOverride("S3SignerType");

        System.setProperty("AWS_PROFILE","adfs");
        //AmazonS3 s3 = new AmazonS3Client(new BasicAWSCredentials(accesskey, secret), config);
        AmazonS3 amazonS3 = AmazonS3ClientBuilder.standard().
                withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withClientConfiguration(config)
                .withRegion("ap-south-1")
                .withPathStyleAccessEnabled(true).withPayloadSigningEnabled(true).build();

        return amazonS3;
    }
}