import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface LegalProps {
  onBack: () => void;
}

export const Impressum: React.FC<LegalProps> = ({ onBack }) => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto min-h-screen">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Zurück
      </button>
      <h1 className="text-4xl font-bold text-white mb-8">Impressum</h1>
      <div className="space-y-6 text-gray-300">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Angaben gemäß § 5 TMG</h2>
          <p>Christian Stockmeier<br />VAMELA</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Kontakt</h2>
          <p>Telefon: +49 176 24200179<br />E-Mail: stockmeier.ch@gmail.com</p>
        </div>
        <div>
            <h2 className="text-xl font-semibold text-white mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>Christian Stockmeier</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Haftung für Inhalte</h2>
          <p className="text-sm text-gray-400">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Datenschutz: React.FC<LegalProps> = ({ onBack }) => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto min-h-screen">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Zurück
      </button>
      <h1 className="text-4xl font-bold text-white mb-8">Datenschutz&shy;erklärung</h1>
      <div className="space-y-6 text-gray-300">
        <p>Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:</p>
        <p>Christian Stockmeier</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Ihre Betroffenenrechte</h2>
        <p>Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit folgende Rechte ausüben:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung,</li>
            <li>Berichtigung unrichtiger personenbezogener Daten,</li>
            <li>Löschung Ihrer bei uns gespeicherten Daten,</li>
            <li>Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen,</li>
            <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns und</li>
            <li>Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Erfassung allgemeiner Informationen beim Besuch unserer Website</h2>
        <p>
            Wenn Sie auf unsere Website zugreifen, werden automatisch mittels eines Cookies Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und ähnliches.
        </p>
        
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Kontaktformular / E-Mail Kontakt</h2>
        <p>
            Treten Sie bzgl. Fragen jeglicher Art per E-Mail oder Kontaktformular mit uns in Kontakt, erteilen Sie uns zum Zwecke der Kontaktaufnahme Ihre freiwillige Einwilligung. Hierfür ist die Angabe einer validen E-Mail-Adresse erforderlich. Diese dient der Zuordnung der Anfrage und der anschließenden Beantwortung derselben.
        </p>
      </div>
    </div>
  );
};
