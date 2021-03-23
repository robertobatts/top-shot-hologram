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

    public List<ObjectId> upload(MultipartFile[] files) throws IOException{
        List<TopShotMedia> topShotMedias = new ArrayList<>();
        for (MultipartFile file : files) {
            TopShotMedia topShotMedia = toTopShotMedia(file);
            topShotMedias.add(topShotMedia);
        }
        topShotMediasRepository.insert(topShotMedias);
        return topShotMedias.stream().map(TopShotMedia::getId).collect(Collectors.toList());
    }

    public byte[] getMediaAsBytesArray(String id) {
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

    private TopShotMedia toTopShotMedia(MultipartFile file) throws IOException {
        return new TopShotMedia(ObjectId.get(), file.getContentType(),
                new Binary(BsonBinarySubType.BINARY, file.getBytes()), LocalDateTime.now(), LocalDateTime.now());
    }
}
