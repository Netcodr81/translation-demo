import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BehaviorSubject } from 'rxjs';
import { cloneDeep } from 'lodash';
import { supportedLanguages } from './supported-languages';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  currentLanguage: string = 'en';
  currentLanguageLocaleId: string = 'en-US';
  supportedLanguages = supportedLanguages;

  private selectedLanguage = new BehaviorSubject<any>(null);
  languageChanged = this.selectedLanguage.asObservable();

  constructor(private translate: TranslateService) {
    if (localStorage.getItem('lang')) {
      this.currentLanguage = <string>localStorage.getItem('lang');
    } else if (this.translate.getBrowserLang()) {
      let browserLanguage: string = <string>this.translate.getBrowserLang();
      localStorage.setItem('lang', browserLanguage);
    } else {
      localStorage.setItem('lang', this.currentLanguage);
    }

    translate.addLangs(supportedLanguages.map((l) => l.code));
  }
  getCurrentLanguageCode() {
    if (localStorage.getItem('lang')) {
      return <string>localStorage.getItem('lang');
    }
    return '';
  }

  getCurrentLanguageLocaleId(): string {
    return this.currentLanguageLocaleId;
  }

  setDefaultLanguage() {
    this.translate.setDefaultLang('en');
  }
  
  translatePage() {
    this.translate.use(this.currentLanguage);
  }
  onLanguageChanged(lang: string) {
    this.currentLanguage = lang;
    localStorage.setItem('lang', lang);
    this.currentLanguageLocaleId = supportedLanguages.find((x) => x.code === lang).localeID;
    this.selectedLanguage.next(null);
  }

  

  getSupportedLanguages() {
    return cloneDeep(this.supportedLanguages);
  }

  
}
