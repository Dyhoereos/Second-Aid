//
//  MedicationInstructionViewController.swift
//  SecondAid
//
//  Created by Kevin Le on 2016-12-06.
//  Copyright © 2016 Andrew Lukonin. All rights reserved.
//

import Foundation
import UIKit
import SwiftyJSON
import Alamofire

class MedicationInstructionViewController: UIViewController {
    
    var medicationInstructions : [MedicationInstruction] = []
    
    @IBOutlet weak var medicationName: UILabel!
    @IBOutlet weak var instructionDescription: UILabel!
    
    var medicationId = 1
    var name = String()
    
    let hostUrl = "http://secondaid.azurewebsites.net/api/medicationinstructions/"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.medicationName.text = name
        
        getMedicationInstructions()
        
    }
    
    func getMedicationInstructions() {
        
        let headers: HTTPHeaders = [
            "Authorization": "Bearer " + TOKEN,
            "Accept": "application/json"
        ]
        
        Alamofire.request(hostUrl, headers: headers).validate().responseJSON { response in
            switch response.result {
            case .success(let value):
                let json = JSON(value)
                
                for meds in json.arrayValue{
                    let medicationId = meds["medicationId"].intValue
                    let medicationInstructionId = meds["medicationInstructionId"].intValue
                    let instruction = meds["instruction"].stringValue
                    
                    let tempMedicalInstruction = MedicationInstruction(medicationId: medicationId, medicationInstructionId: medicationInstructionId, instruction: instruction)
                    
                    self.medicationInstructions.append(tempMedicalInstruction)
                }
                self.findMedicationInstruction()
                
            case .failure(_): break
                
            }
        }
    }
    
    func findMedicationInstruction(){
        
        for med in self.medicationInstructions {
            if med.medicationId == medicationId {
                self.instructionDescription.text = med.instruction
            }
        }
        
    }
}


struct MedicationInstruction {
    var medicationId            : Int
    var medicationInstructionId : Int
    var instruction             : String
    
    init(medicationId : Int, medicationInstructionId : Int, instruction : String){
        self.medicationId = medicationId
        self.medicationInstructionId = medicationInstructionId
        self.instruction = instruction
    }
}
