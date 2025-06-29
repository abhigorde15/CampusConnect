package com.campus_connect.CampusConnect_Backend.models;

public class ChatMessageDTO {
    private String senderName;
    private String content;
    private String groupName;
	public String getSenderName() {
		return senderName;
	}
	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public ChatMessageDTO(String senderName, String content, String groupName) {
		super();
		this.senderName = senderName;
		this.content = content;
		this.groupName = groupName;
	}
    public ChatMessageDTO() {}
}
