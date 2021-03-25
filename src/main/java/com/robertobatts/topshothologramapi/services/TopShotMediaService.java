package com.robertobatts.topshothologramapi.services;

import com.robertobatts.topshothologramapi.domain.TopShotMedia;
import com.robertobatts.topshothologramapi.repositories.TopShotMediasRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TopShotMediaService {

    @Autowired
    private TopShotMediasRepository topShotMediasRepository;

    @Autowired
    private TopShotRawMediaProcessor topShotRawMediaProcessor;

    public List<ObjectId> insert(MultipartFile[] files) throws IOException {
        List<byte[]> byteArrays = topShotRawMediaProcessor.process(files);
        List<TopShotMedia> topShotMedias = new ArrayList<>();
        for (int i = 0; i < byteArrays.size(); i++) {
            TopShotMedia topShotMedia = toTopShotMedia(byteArrays.get(i), files[i].getContentType());
            topShotMedias.add(topShotMedia);
        }
        topShotMediasRepository.insert(topShotMedias);
        return topShotMedias.stream().map(TopShotMedia::getId).collect(Collectors.toList());
    }

    public byte[] findMediaAsBytesArray(String id) {
        Optional<TopShotMedia> topShotMediaOpt = findById(id);
        if (topShotMediaOpt.isPresent()) {
            TopShotMedia topShotMedia = topShotMediaOpt.get();
            return topShotMedia.getMedia().getData();
        }
        return new byte[]{};
    }

    private Optional<TopShotMedia> findById(String id) {
        ObjectId objectId = new ObjectId(id);
        return topShotMediasRepository.findById(objectId);
    }

    private TopShotMedia toTopShotMedia(byte[] byteArray, String contentType) throws IOException {
        return new TopShotMedia(ObjectId.get(), contentType,
                new Binary(BsonBinarySubType.BINARY, byteArray), LocalDateTime.now(), LocalDateTime.now());
    }
}
