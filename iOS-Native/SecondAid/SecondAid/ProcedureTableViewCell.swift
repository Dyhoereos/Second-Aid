//
//  ProcedureTableViewCell.swift
//  SecondAid
//
//  Created by Andrew Lukonin on 2016-11-30.
//  Copyright © 2016 Andrew Lukonin. All rights reserved.
//

import UIKit

class ProcedureTableViewCell: UITableViewCell {
    @IBOutlet weak var phoneNumberLabel: UILabel!
    @IBOutlet weak var procedureNameLabel: UILabel!
    @IBOutlet weak var clinicNameLabel: UILabel!
    @IBOutlet weak var doctorNameLabel: UILabel!
    @IBOutlet weak var timeLabel: UILabel!
    
    

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
