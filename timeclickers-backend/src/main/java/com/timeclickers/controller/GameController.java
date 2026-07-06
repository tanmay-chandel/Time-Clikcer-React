package com.timeclickers.controller;

import com.timeclickers.model.Player;
import com.timeclickers.service.GameService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
@CrossOrigin("*")

public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    // Main click
    @PostMapping("/click")
    public Player click() {
        return gameService.click();
    }

    // Get game state
    @GetMapping("/state")
    public Player state() {
        return gameService.getPlayer();
    }

    // Buy click upgrade
    @PostMapping("/upgrade")
    public Player upgrade() {
        return gameService.buyUpgrade();
    }

    // Buy passive income
    @PostMapping("/passive")
    public Player buyPassive() {
        return gameService.buyPassiveIncome();
    }

    // Passive income tick
    @PostMapping("/tick")
    public Player tick() {
        return gameService.tickPassiveIncome();
    }

    // Quiz reward
    @PostMapping("/reward")
    public Player reward() {
        return gameService.rewardPlayer();
    }
}