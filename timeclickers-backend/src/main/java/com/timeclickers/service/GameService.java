package com.timeclickers.service;

import com.timeclickers.model.Player;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    private Player player = new Player();

    // Main click
    public Player click() {
        player.click();
        return player;
    }

    // Current state
    public Player getPlayer() {
        return player;
    }

    // Upgrade click power
    public Player buyUpgrade() {

        if (player.getPoints() >= player.getUpgradeCost()) {
            player.spendPoints(player.getUpgradeCost());
            player.upgradeClickPower();
        }

        return player;
    }

    // Upgrade passive income
    public Player buyPassiveIncome() {

        if (player.getPoints() >= player.getPassiveCost()) {
            player.spendPoints(player.getPassiveCost());
            player.upgradePassiveIncome();
        }

        return player;
    }

    // Passive tick every second
    public Player tickPassiveIncome() {
        player.addPassiveIncome();
        return player;
    }

    // Reward after correct quiz
    public Player rewardPlayer() {
        player.rewardQuiz();
        return player;
    }
}