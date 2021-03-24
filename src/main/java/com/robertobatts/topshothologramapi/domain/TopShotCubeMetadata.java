package com.robertobatts.topshothologramapi.domain;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Document(collection = "top_shot_cube_metadata")
public class TopShotCubeMetadata {

    private ObjectId id;

    private String playerName;

    private List<ObjectId> mediaIds;

    private LocalDateTime createdDateTime;

    private LocalDateTime updatedDateTime;

    public TopShotCubeMetadata(ObjectId id, String playerName, List<ObjectId> mediaIds,
                               LocalDateTime createdDateTime, LocalDateTime updatedDateTime) {
        this.id = id;
        this.playerName = playerName;
        this.mediaIds = mediaIds;
        this.createdDateTime = createdDateTime;
        this.updatedDateTime = updatedDateTime;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public List<ObjectId> getMediaIds() {
        return mediaIds;
    }

    public List<String> getMediaIdsAsString() {
        return mediaIds.stream().map(ObjectId::toString).collect(Collectors.toList());
    }

    public void setMediaIds(List<ObjectId> mediaIds) {
        this.mediaIds = mediaIds;
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
