package com.robertobatts.topshothologramapi.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
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

    private byte[] processPhoto1(MultipartFile photo) throws IOException {
        BufferedImage bi = ImageIO.read(photo.getInputStream());
        bi = bi.getSubimage((int)(bi.getWidth()*0.237), (int)(bi.getHeight()*0.237), (int)(bi.getWidth()*0.526), (int)(bi.getHeight()*0.526));
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bi, "jpg", baos);
        return baos.toByteArray();
    }

    private byte[] processPhoto2(MultipartFile photo) throws IOException {
        BufferedImage bi = ImageIO.read(photo.getInputStream());
        bi = bi.getSubimage((int)(bi.getWidth()*0.213), (int)(bi.getHeight()*0.213), (int)(bi.getWidth()*0.574), (int)(bi.getHeight()*0.574));
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bi, "jpg", baos);
        return baos.toByteArray();
    }

    private byte[] processPhoto5(MultipartFile photo) throws IOException {
        BufferedImage bi = ImageIO.read(photo.getInputStream());
        bi = bi.getSubimage((int)(bi.getWidth()*0.237), (int)(bi.getHeight()*0.237), (int)(bi.getWidth()*0.526), (int)(bi.getHeight()*0.526));
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bi, "jpg", baos);
        return baos.toByteArray();
    }

    /*
    private byte[] processPhoto3(MultipartFile photo) throws Exception {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

        MatOfPoint2f corners = new MatOfPoint2f();
        Mat src = Imgcodecs.imread(photo.getResource().getFile().getAbsolutePath());

        Point p4 = new Point(429, 596);
        Point p1 = new Point(429, 181);
        Point p2 = new Point(624, 237);
        Point p3 = new Point(624, 540);
        corners.push_back(new MatOfPoint2f(p1));
        corners.push_back(new MatOfPoint2f(p2));
        corners.push_back(new MatOfPoint2f(p3));
        corners.push_back(new MatOfPoint2f(p4));

        Point center = new Point(0, 0);
        for (int i = 0; i < corners.toArray().length; i++) {
            center.x += corners.toArray()[i].x;
            center.y += corners.toArray()[i].y;
        }

        center.x /= corners.toArray().length;
        center.y /= corners.toArray().length;
        MatOfPoint2f top = new MatOfPoint2f();
        MatOfPoint2f bot = new MatOfPoint2f();

        for (int i = 0; i < corners.toArray().length; i++) {
            if (corners.toArray()[i].y < center.y){
                top.push_back(new MatOfPoint2f(corners.toArray()[i]));
            }
            else
                bot.push_back(new MatOfPoint2f(corners.toArray()[i]));
        }

        Point tl = p4;
        Point tr = p1;
        Point bl = p2;
        Point br = p3;

        tl = top.toArray()[0].x > top.toArray()[1].x ? top.toArray()[1] : top.toArray()[0];
        tr = top.toArray()[0].x > top.toArray()[1].x ? top.toArray()[0] : top.toArray()[1];
        bl = bot.toArray()[0].x > bot.toArray()[1].x ? bot.toArray()[1] : bot.toArray()[0];
        br = bot.toArray()[0].x > bot.toArray()[1].x ? bot.toArray()[0] : bot.toArray()[1];

        corners.release();
        corners.push_back(new MatOfPoint2f(tl));
        corners.push_back(new MatOfPoint2f(tr));
        corners.push_back(new MatOfPoint2f(br));
        corners.push_back(new MatOfPoint2f(bl));

        Mat quad = Mat.zeros(1000, 1900, CvType.CV_8U);

        MatOfPoint2f quad_pts = new MatOfPoint2f();

        quad_pts.push_back(new MatOfPoint2f(new Point(0, 0)));
        quad_pts.push_back(new MatOfPoint2f(new Point(quad.width(), 0)));
        quad_pts.push_back(new MatOfPoint2f(new Point(quad.width(), quad.height())));
        quad_pts.push_back(new MatOfPoint2f(new Point(0, quad.height())));

        Mat transmtx = Imgproc.getPerspectiveTransform(corners, quad_pts);

        Imgproc.warpPerspective(src, quad, transmtx, quad.size());

        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", quad, matOfByte);
        return matOfByte.toArray();
    }*/

}
