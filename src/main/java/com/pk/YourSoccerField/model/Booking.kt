package com.pk.YourSoccerField.model

import java.time.LocalDate
import javax.persistence.*

@Entity
data class Booking(

        @Id
        @GeneratedValue
        val id: Long,

        @ManyToOne
        val user: User,

        val startDate: LocalDate,

        @Column(nullable = false)
        val executionTime: Int,

        @ManyToOne
        val soccerField: SoccerField,

        val isPayed: Boolean
)