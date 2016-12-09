//
//  HomeViewController.swift
//  SecondAid
//
//  Created by Derek Larson on 2016-12-06.
//  Copyright © 2016 Andrew Lukonin. All rights reserved.
//

import Foundation
import UIKit
import Alamofire
import SwiftyJSON

var TOKEN = String()

class HomeViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    
    
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var helloLabel: UILabel!
    
    var schedules: [Schedule] = []
    var procedures: [Procedure] = []
    var userProcedures: [Procedure] = []

    var user : User?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        tableView.dataSource = self
        tableView.delegate = self
        
        TOKEN = (self.user?.token)!
        
        getUserInfo()
        getSchedules()
        getProcedures()
        

        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        
    }
    
    func getUserInfo(){
        
        let headers: HTTPHeaders = [
            "Authorization": "Bearer " + TOKEN,
            "Accept": "application/json"
        ]
        
        let url = "http://secondaid.azurewebsites.net/api/UserInfo/"
        
        Alamofire.request(url, headers: headers).validate().responseJSON { response in
            switch response.result {
            case .success(let value):
                let json = JSON(value)
                
                self.helloLabel.text = "Hello, " + json["firstName"].stringValue
                
            case .failure(let error):
                print(error)
            }
        }
        
    }
    
    func getSchedules() {

        let hostUrl = "http://secondaid.azurewebsites.net/api/schedules"
        
        let headers: HTTPHeaders = [
            "Authorization": "Bearer " + TOKEN,
            "Accept": "application/json"
        ]
        
        Alamofire.request(hostUrl, headers: headers).validate().responseJSON { response in
            switch response.result {
            case .success(let value):
                let json = JSON(value)
                print(json)
                for schedule in json.arrayValue {
                    let time = schedule["time"].stringValue
                    let procedureId   = schedule["procedureId"].intValue
                    let scheduleId    = schedule["scheduleId"].intValue
                    let isCompleted   = schedule["isCompleted"].boolValue
                    let tempSchedule  = Schedule(time: time, scheduleId: scheduleId, procedureId: procedureId, isCompleted: isCompleted)
                    
                    self.schedules.append(tempSchedule)
                    //self.setNames()
                }
            case .failure(let error):
                print(error)
            }
        }
    }
    
    func getProcedures(){
        
        let headers: HTTPHeaders = [
            "Authorization": "Bearer " + TOKEN,
            "Accept": "application/json"
        ]
        
        let url = "http://secondaid.azurewebsites.net/api/procedures/"

        Alamofire.request(url, headers: headers).validate().responseJSON { response in
            switch response.result {
            case .success(let value):
                let json = JSON(value)
                print(json)
                for procedure in json.arrayValue {
                    
                    let name = procedure["name"].stringValue
                    let procedureId = procedure["procedureId"].intValue
                    let description = procedure["description"].stringValue
                    let tempProcedure = Procedure(name: name, id: procedureId, description: description)
                    //print(String(procedureId) + " " + name + " " + description)
                    self.procedures.append(tempProcedure)
                }
                self.parseProcedures()
            case .failure(let error):
                print(error)
            }
        }
        
    }
    
    func parseProcedures() {
        print("______________________in parse")
        for i in 0..<self.procedures.count {
            for schedule in schedules {
                if procedures[i].procedureId == schedule.procedureId {
                    procedures[i].schedule = schedule
                    self.userProcedures.append(procedures[i])
                    print("______________________parsed")
                }
            }
        }
        print(userProcedures.count)
        self.tableView.reloadData()
        
    }
    
//    func setNames() {
//        for procedure in procedures {
//            let procId = procedure.procedureId
//            for i in 0..<schedules.count {
//                let schedId = schedules[i].procedureId
//                if schedId == procId {
//                    schedules[i].name = procedure.name
//                }
//            }
//        }
//    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let procedure = userProcedures[indexPath.row]
        
        // Instantiate a cell
        let cellIdentifier = "ScheduleCell"
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier) ?? UITableViewCell(style: .subtitle, reuseIdentifier: cellIdentifier)
        
        cell.textLabel?.text = procedure.name
        
        if(procedure.schedule?.isCompleted)!{
            cell.detailTextLabel?.text = "Completed"
        }else{
            cell.detailTextLabel?.text = "Scheduled"
        }
        
        
        // Returning the cell
        return cell
        
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return userProcedures.count
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath){
        
        self.performSegue(withIdentifier: "showProcedure", sender: indexPath)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let index = (sender as? IndexPath)?.row {
            if segue.identifier == "showProcedure" {
                let vc = segue.destination as! ProcedureViewController
                vc.procedure = userProcedures[index]
            }
        }
    }


}

struct Schedule {
    var time : String
    var scheduleId: Int
    var procedureId: Int
    var isCompleted: Bool
    
    init(){
        self.time = ""
        self.scheduleId = 0
        self.procedureId = 0
        self.isCompleted = false
    }
    
    init(time: String, scheduleId: Int, procedureId: Int, isCompleted: Bool){
        self.time = time
        self.scheduleId = scheduleId
        self.procedureId = procedureId
        self.isCompleted = isCompleted
    }
    
}

struct Procedure {
    var name: String
    var procedureId: Int
    var description: String
    var schedule : Schedule?
    
    init(){
        self.name = ""
        self.procedureId = 0
        self.description = ""
    }
    
    init(name: String, id: Int, description: String){
        self.name = name
        self.procedureId = id
        self.description = description
    }
}
