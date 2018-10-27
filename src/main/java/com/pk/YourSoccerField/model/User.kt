package com.pk.YourSoccerField.model

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "user")
@SecondaryTable(name = "user_detail")
open class User(

        @Id
        @GeneratedValue
        val id: Long,

        @Column(nullable = false, updatable = false, unique = true)
        val code: Long,

        @Column(nullable = false, length = 32)
        val mail: String,

        @Column(nullable = false)
        val userPassword: String,

        @Column(nullable = false)
        val isActive: Boolean,

        @Column(nullable = false, length = 32, table = "user_detail")
        val firstName: String,

        @Column(nullable = false, length = 32, table = "user_detail")
        val secondName: String,

        @Column(nullable = false, length = 32, table = "user_detail")
        val nickname: String,

        @Column(nullable = false, table = "user_detail")
        val createTime: LocalDateTime,

        @OneToMany(mappedBy = "user")
        val roles: Set<UserRole>,

        @OneToMany(mappedBy = "user")
        val addresses: List<UserAddress>,

        @OneToMany(mappedBy = "user")
        val bookings: List<Booking>
)