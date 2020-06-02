<template>
  <div class="about">
    <h3>About</h3>
    <p>
      Diese Seite wird von mir betrieben.
      Ich bin 2004 geboren und ging während dem Programmieren dieser App in die 10. Klasse.
      In meiner Freizeit programmiere ich gerne.
      Sollte Ihnen ein Bug auffallen, können Sie gerne
      <a
        href="https://github.com/kochbuch-sebastian/kochbuch/issues"
        target="_blank"
        rel="noopener noreferrer"
        class="router-links noMargin"
      >hier</a> unter "New issue" mit dem Label "bug" melden.
      Einen Verbesserungsvorschlag können Sie gerne
      <a
        href="https://github.com/kochbuch-sebastian/kochbuch/issues"
        target="_blank"
        rel="noopener noreferrer"
        class="router-links noMargin"
      >hier</a> unter "New issue" mit dem Label "enhancement" vorschlagen. Sie können gerne auch eines der beiden Vorlagen nutzen.
      Alternativ können Sie auch eine Email mit "enhancement" oder "bug" im Betreff an kochbuch-sebastian@web.de schreiben. Ich freue mich auf Ihr Feedback!
    </p>
    <p>
      Das Frontend wie auch das Backend dieser Applikation habe ich in der Zeit seit den Osterferien 2020 (während der Corona-Zeit) entwickelt.
      Das Backend finden Sie
      <router-link :to="{ name: 'Backend' }" class="router-links noMargin">hier</router-link>.
      Die Icons wurden teilweise gemalt, teilweise kommen sie von der Seite "www.iconfinder.com".
    </p>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>
</style>
