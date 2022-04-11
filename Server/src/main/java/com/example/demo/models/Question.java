package com.example.demo.models;

import java.util.List;

public class Question {

	private String question;
	
	private List<String> options;

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public List<String> getOptions() {
		return options;
	}

	public void setOptions(List<String> options) {
		this.options = options;
	}

	public Question(String question, List<String> options) {
		super();
		this.question = question;
		this.options = options;
	}

	public Question() {
		super();
	}
	
	
}
