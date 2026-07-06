package com.timeclickers.model;

public class Player {

    private int points = 0;
    private int clickPower = 1;
    private int passiveIncome = 0;

    private int upgradeCost = 10;
    private int passiveCost = 25;

    // Quiz system
    private int quizReward = 100;
    private int correctAnswers = 0;

    // Main click
    public void click() {
        points += clickPower;
    }

    // Passive income
    public void addPassiveIncome() {
        points += passiveIncome;
    }

    // Quiz reward
    public void rewardQuiz() {
        points += quizReward;
        correctAnswers++;

        // Reward scales upward
        quizReward += 100;
    }

    // Getters
    public int getPoints() {
        return points;
    }

    public int getClickPower() {
        return clickPower;
    }

    public int getPassiveIncome() {
        return passiveIncome;
    }

    public int getUpgradeCost() {
        return upgradeCost;
    }

    public int getPassiveCost() {
        return passiveCost;
    }

    public int getQuizReward() {
        return quizReward;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    // Upgrades
    public void upgradeClickPower() {
        clickPower++;

        // Cost scaling
        upgradeCost = (int)(upgradeCost * 1.5);
    }

    public void upgradePassiveIncome() {
        passiveIncome++;

        // Cost scaling
        passiveCost = (int)(passiveCost * 1.5);
    }

    public void spendPoints(int amount) {
        points -= amount;
    }
}