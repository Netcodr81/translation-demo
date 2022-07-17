import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubSink } from 'subsink/dist/es2015';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions = new SubSink();
  currentLanguageCode: string = 'en';
  availableLanguages: any[] = [];

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.setDefaultLanguage();
    this.translationService.translatePage();
    this.subscriptions.sink = this.translationService.languageChanged.subscribe(
      () => {
        this.currentLanguageCode =
          this.translationService.getCurrentLanguageCode();
        this.translationService.translatePage();
      }
    );

    this.availableLanguages = this.translationService.getSupportedLanguages();
    console.log(this.availableLanguages);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onLanguageSelected(event: any) {
    let selectedLanguage = event.target.value;
    this.translationService.onLanguageChanged(selectedLanguage);
  }
}
