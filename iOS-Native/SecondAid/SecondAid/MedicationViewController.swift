//
//  MedicationViewController.swift
//  SecondAid
//
//  Created by Kevin Le on 2016-12-06.
//  Copyright © 2016 Andrew Lukonin. All rights reserved.
//

import Foundation
import UIKit
import SwiftyJSON
import Alamofire

class MedicationViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    
    @IBOutlet weak var medicationTableView: UITableView!
    
    var medications : [Medication] = []
    
    let url = "http://secondaid.azurewebsites.net/api/medications/"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        medicationTableView.dataSource = self
        medicationTableView.delegate = self
        
        getMedications()
    }
    
    func getMedications() {
        
        let headers: HTTPHeaders = [
            "Authorization": "Bearer " + TOKEN,
            "Accept": "application/json"
        ]
        
        Alamofire.request(url, headers: headers).validate().responseJSON { response in
            switch response.result {
            case .success(let value):
                let json = JSON(value)
                
                for medication in json.arrayValue {
                    let id          = medication["medicationId"].intValue
                    let name        = medication["name"].stringValue
                    let description = medication["description"].stringValue
                    
                    let tempMedication = Medication(id: id, name: name, desc: description)
                    
                    self.medications.append(tempMedication)
                }
                
                self.medicationTableView.reloadData()
                
            case .failure(let error):
                print(error)
            }
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let medication = medications[indexPath.row]
        
        // Instantiate a cell
        let cellIdentifier = "MedicationCell"
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier)
            ?? UITableViewCell(style: .subtitle, reuseIdentifier: cellIdentifier)
        
        cell.textLabel?.text        = medication.name
        cell.detailTextLabel?.text  = medication.description
        
        // Returning the cell
        return cell
        
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return medications.count
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath){
        
        self.performSegue(withIdentifier: "showMedicationInstructions", sender: indexPath)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let index = (sender as? IndexPath)?.row {
            if segue.identifier == "showMedicationInstructions" {
                let vc = segue.destination as! MedicationInstructionViewController
                vc.name         = medications[index].name
                vc.medicationId = medications[index].medicationId
            }
        }
    }
    
}

struct Medication {
    var medicationId : Int
    var name         : String
    var description  : String
    
    init(id : Int, name: String, desc : String){
        self.medicationId = id
        self.name         = name
        self.description  = desc
    }
}
