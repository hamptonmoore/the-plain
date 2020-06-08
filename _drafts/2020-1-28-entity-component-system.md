---
title: An introduction to Entity–component–systems
updated: 2020-6-8
---

Recently, I created the fourth version of my game GetSquared. GetSquared is a game I have been working on and off of for the past 3 years, with this being it's fourth finished version, seventh attempt. 
Before this all of the other versions had online networking, but that was proving to be a real challenge, so for this version it was local single player only. 

GetSquared version four was created using the Entity–component–system archecture.
The short and simple explaination is that ECS is an archecture in which the game entities are just UUIDs which get assigned to systems. 
For instance "player" entity would get the Velocity system, MarkerSummoner, CharacterController2D system, etc.
Each system is meant to handle one thing in the game.
For instance the MarkerSummoner system handles summoning a marker when the user presses `space` to summon one, and the CharacterController2D handles converting player key presses into momentum to be applied to their velocity. 
The velocity system turns uses the player's velocity to change the current position of the player.


