//
//  ViewController.swift
//  SecondAid
//
//  Created by Andrew Lukonin on 2016-11-29.
//  Copyright © 2016 Andrew Lukonin. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON
import JWTDecode


class ViewController: UIViewController {
    @IBOutlet weak var messageLabel: UILabel!
    
    
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    
    let url = "http://secondaid.azurewebsites.net/connect/token"

    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "Welcome to Second Aid"
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // decode JWT token for user info
    func decodeToken(_ idToken : String) -> JSON {
        do {
            let jwt = try decode(idToken)
            let json = JSON(jwt.body)
            return json
        } catch {
            print("Failed to decode JWT: \(error)")
        }
        return JSON.null
    }

    @IBAction func signIn(_ sender: Any) {
        self.userLogin(usernameTextField.text, password: passwordTextField.text)
    }
    
    func userLogin(_ username: String!, password: String!) -> Void {
        
        var parameters = [
            "grant_type"    : "password",
            "scope"         : "openid profile roles",
            "clinic_id"     : "1"
        ]
        
        parameters["username"] = username
        parameters["password"] = password
        
        Alamofire.request(url, method: .post, parameters: parameters).responseJSON { (response) -> Void in
            if response.result.value != nil {
                // put response into a swiftyJSON
                let json = JSON(response.result.value!)
                //print(json)
                if(json["error"].exists()) {
                    self.messageLabel.text = "Error logging in."
                } else {
                    var decodedToken = self.decodeToken(json["id_token"].stringValue)
                    
                    let user = User(
                        email   : decodedToken["unique_name"].stringValue,
                        token   : json["access_token"].stringValue,
                        roles   : decodedToken["role"].arrayValue)
                    self.loggedIn(user)
                }
                
            }
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let user = sender as? User{
            if (segue.identifier == "loggedIn") {
                let navVC = segue.destination as! UINavigationController
                let destVC = navVC.topViewController as! HomeViewController
                destVC.user =  user as User
            }
        }
        
    }
    
    func loggedIn(_ user : User) {
        self.performSegue(withIdentifier: "loggedIn", sender: user)
    }
    
}

