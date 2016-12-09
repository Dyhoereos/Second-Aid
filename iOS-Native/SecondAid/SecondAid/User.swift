//
//  User.swift
//  SecondAid
//
//  Created by Andrew Lukonin on 2016-11-30.
//  Copyright © 2016 Andrew Lukonin. All rights reserved.
//

import Foundation
import SwiftyJSON

struct User {
    
    var userCreated : Bool
    var email : String
    var token : String
    var roles : [JSON]
    
    /*
    init () {
        self.userCreated = false
        self.email = ""
        self.roles = [""]
        self.token = ""
    }*/
    
    init (email : String!, token : String!, roles : [JSON]) {
        self.userCreated = true
        self.email = email
        self.token = token
        self.roles = roles
    }
    
}
