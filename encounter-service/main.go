package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Monster struct {
	Name    string `json:"name,omitempty"`
	Hp      int    `json:"hp,omitempty"`
	IsAlive bool   `json:"isAlive,omitempty"`
}

var goblin Monster
var goblinKilled int

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "PUT", "PATCH", "POST"},
	}))
	r.GET("/api/goblin", getGoblin)
	r.PUT("/api/goblin", updateGoblin)
	r.GET("/api/goblin/killed", countGoblinKilled)

	r.Run(":8080")
}

func newGoblin() *Monster {
	g := Monster{
		Name:    "Goblin",
		Hp:      25,
		IsAlive: true,
	}
	return &g
}

func getGoblin(c *gin.Context) {
	if !goblin.IsAlive {
		goblin = *newGoblin()
	}
	c.JSON(http.StatusOK, goblin)
}

func updateGoblin(c *gin.Context) {
	if goblin.IsAlive {
		err := c.ShouldBindJSON(&goblin)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error()})
			return
		}
	}
	if goblin.Hp <= 0 {
		goblin.IsAlive = false
		goblin.Hp = 0
		goblinKilled++
		goblin = *newGoblin()
	}
	c.JSON(http.StatusOK, goblin)
}

func countGoblinKilled(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"goblinKilled": goblinKilled})
}
