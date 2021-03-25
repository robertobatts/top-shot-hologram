package com.robertobatts.topshothologramapi.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class TopShotRawMediaProcessor {

    public List<byte[]> process(MultipartFile[] files) throws IOException {
        List<byte[]> byteArrays = new ArrayList<>();
        byteArrays.add(files[0].getBytes());
        byteArrays.add(processPhoto1(files[1]));
        byteArrays.add(processPhoto2(files[2]));
        byteArrays.add(files[3].getBytes());
        byteArrays.add(files[4].getBytes());
        byteArrays.add(processPhoto5(files[5]));
        return byteArrays;
    }

    public byte[] processPhoto1(MultipartFile photo) throws IOException {
        BufferedImage bi = ImageIO.read(photo.getInputStream());
        bi = bi.getSubimage((int)(bi.getWidth()*0.237), (int)(bi.getHeight()*0.237), (int)(bi.getWidth()*0.526), (int)(bi.getHeight()*0.526));
        File outputfile = new File("C:\\Users\\Roberto\\Downloads\\image.jpg");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bi, "jpg", baos);
        return baos.toByteArray();
    }

    public byte[] processPhoto2(MultipartFile photo) throws IOException {
        BufferedImage bi = ImageIO.read(photo.getInputStream());
        bi = bi.getSubimage((int)(bi.getWidth()*0.213), (int)(bi.getHeight()*0.213), (int)(bi.getWidth()*0.574), (int)(bi.getHeight()*0.574));
        File outputfile = new File("C:\\Users\\Roberto\\Downloads\\image.jpg");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bi, "jpg", baos);
        return baos.toByteArray();
    }

    public byte[] processPhoto5(MultipartFile photo) throws IOException {
        BufferedImage bi = ImageIO.read(photo.getInputStream());
        bi = bi.getSubimage((int)(bi.getWidth()*0.237), (int)(bi.getHeight()*0.237), (int)(bi.getWidth()*0.526), (int)(bi.getHeight()*0.526));
        File outputfile = new File("C:\\Users\\Roberto\\Downloads\\image.jpg");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bi, "jpg", baos);
        return baos.toByteArray();
    }
}
