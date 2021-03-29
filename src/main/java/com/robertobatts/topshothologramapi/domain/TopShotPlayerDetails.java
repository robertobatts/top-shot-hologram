package com.robertobatts.topshothologramapi.domain;

public class TopShotPlayerDetails {

    private String playerName;

    private String date;

    private String type;

    public TopShotPlayerDetails(String playerName, String date, String type) {
        this.playerName = playerName;
        this.date = date;
        this.type = type;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
