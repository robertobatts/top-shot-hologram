package com.robertobatts.topshothologramapi.domain;

import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "top_shot_media")
public class TopShotMedia {

    @Id
    private ObjectId id;

    private String mediaType;

    private Binary media;

    private LocalDateTime createdDateTime;

    private LocalDateTime updatedDateTime;

    public TopShotMedia(ObjectId id, String mediaType, Binary media, LocalDateTime createdDateTime, LocalDateTime updatedDateTime) {
        this.id = id;
        this.mediaType = mediaType;
        this.media = media;
        this.createdDateTime = createdDateTime;
        this.updatedDateTime = updatedDateTime;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public Binary getMedia() {
        return media;
    }

    public void setMedia(Binary media) {
        this.media = media;
    }

    public LocalDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(LocalDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public LocalDateTime getUpdatedDateTime() {
        return updatedDateTime;
    }

    public void setUpdatedDateTime(LocalDateTime updatedDateTime) {
        this.updatedDateTime = updatedDateTime;
    }
}
