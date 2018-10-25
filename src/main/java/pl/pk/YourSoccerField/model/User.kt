package pl.pk.YourSoccerField.model

import java.time.LocalDate
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class User(

        @Id @GeneratedValue val id: Long,

        @Column(nullable = false) val code: Long,
        @Column(nullable = false, length = 32) val mail: String,
        @Column(nullable = false, length = 32) val nickName: String,
        @Column(nullable = false) val password: String,
        @Column(nullable = false) val createTime: LocalDate,
        @Column(nullable = false) val isActive: Boolean
)