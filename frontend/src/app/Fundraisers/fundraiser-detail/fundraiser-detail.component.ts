import { Component, OnInit } from '@angular/core';
import {Fundraiser} from '../../models/fundraiser';
import {ActivatedRoute} from '@angular/router';
import {FundraiserServicesService} from '../../services/fundraiser-services.service';
import {DonationServicesService} from '../../services/donation-services.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-fundraiser-detail',
  templateUrl: './fundraiser-detail.component.html',
  styleUrls: ['./fundraiser-detail.component.scss']
})
export class FundraiserDetailComponent implements OnInit {
  fundraiserId: string;
  fundraiser: Fundraiser;
  donations: any = [];

  constructor(private route: ActivatedRoute,
              private fundraiserService: FundraiserServicesService,
              private donationService: DonationServicesService,
              private snackBar: MatSnackBar) {
    this.fundraiserId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getFundraiser();
    this.getDonationsByFundraiserId();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getFundraiser() {
    this.fundraiserService.getFundraiser(this.fundraiserId).subscribe(data => {
    this.fundraiser = data;
  }, error => {
    console.log(error);
    this.openSnackBar('Failed to get fundraiser with id:' + this.fundraiserId, 'Okay');
  });
  }

  getDonationsByFundraiserId() {
    this.donationService.getDonationsByFundraiserId(this.fundraiserId).subscribe(data => {
      this.donations = data;
    }, error => {
      console.log(error);
      this.openSnackBar('Error fetching Fundraisers', 'Okay');
    });
  }

}
