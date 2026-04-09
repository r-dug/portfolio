import { ProjectPage } from '@/components/ProjectPage'

export function FungusClassifierPage() {
  return (
    <ProjectPage
      name="Fungal Species Classifier"
      tagline="Fine-grained image classification — 1,000 species"
      githubUrl="https://github.com/r-dug/GCViT_Classifier"
      tech={['TensorFlow', 'Keras', 'GCViT', 'scikit-learn', 'DBSCAN', 'TFLite', 'Kotlin', 'Jetpack Compose', 'CameraX', 'Room', 'Selenium']}
      sections={[
        {
          heading: 'Motivation',
          body: 'Fine-grained fungal classification from images is a genuinely hard problem: intraclass variation is high (the same species looks different in different lighting and substrates), interclass similarity is high (many species within a genus are near-identical), and real-world photos are noisy. The additional constraint was mobile edge inference\u2014the model had to run on-device without a network connection.',
        },
        {
          heading: 'Data Pipeline',
          body: [
            {
              point: '**iNaturalist source data:** 194,258 images across 1,000 fungal species (Basidiomycota and Ascomycota), filtered to "Research" quality observations.',
            },
            {
              point: '**DBSCAN outlier filtering:** Raw iNaturalist data contains significant noise\u2014fingers obscuring the subject, microscopy images, distant scenery, observer obstruction. We extract feature embeddings per image using MobileNetV3Small, compute k-distances, and apply DBSCAN per-species directory with epsilon auto-calculated from the distance distribution.',
              sub: [
                '~20,000 anomalous images removed from the training set',
                'Filtering improved training signal without requiring manual labeling passes',
              ],
            },
            {
              point: '**Species metadata scraper:** Selenium-based pipeline that pulls common names, descriptions, and lookalike species from iNaturalist into a SQLite database\u2014bundled with the Android app to provide context alongside classification results.',
            },
          ],
          carousel: [
            { src: '/images/fungus-classifier/bad-finger.jpg', alt: 'Finger obstruction', caption: 'Filtered: finger obscuring subject' },
            { src: '/images/fungus-classifier/bad-microscopy.jpg', alt: 'Microscopy image', caption: 'Filtered: microscopy image (won\'t match mobile photos)' },
            { src: '/images/fungus-classifier/bad-scenery.jpg', alt: 'Distant scenery', caption: 'Filtered: mushroom barely visible in landscape' },
            { src: '/images/fungus-classifier/bad-distance.jpg', alt: 'Too distant', caption: 'Filtered: subject too far for meaningful features' },
            { src: '/images/fungus-classifier/bad-obstruction.png', alt: 'Observer obstruction', caption: 'Filtered: observer obstruction pattern' },
          ],
        },
        {
          heading: 'Architecture',
          body: [
            {
              point: '**Custom GCViT implementation:** Built layer-by-layer in TensorFlow/Keras\u2014not imported from a model zoo. This includes windowed + global attention mechanisms, transformer blocks, positional embedding, hierarchical levels, and squeeze-and-excitation.',
              sub: [
                'DropPath (stochastic depth) for regularization',
                'Global query mechanism for cross-window information flow',
              ],
            },
            {
              point: '**Three model variants trained:** gcvitxxtiny (~12M params, 185 MB), gcvittiny (~28M params, 433 MB), gcvitbase (~90M params, 1 GB).',
            },
            {
              point: '**Transfer learning with staged unfreezing:** Pretrained ImageNet weights loaded with skip_mismatch, then progressively deeper layers unfrozen across training phases.',
              sub: [
                'AdamW optimizer (weight_decay=0.05, EMA, clipnorm=5.0)',
                'ImageNet mean/std normalization (channel-wise)',
                'ReduceLROnPlateau, ModelCheckpoint, EarlyStopping callbacks',
              ],
            },
          ],
        },
        {
          heading: 'Evaluation',
          body: [
            {
              point: '**1000\u00d71000 confusion matrix** computed across all species. Per-species recall ranges ~0.05\u20130.25\u2014expected for 1,000 fine-grained classes.',
            },
            {
              point: '**Misclassifications are taxonomically coherent:** e.g., *Ganoderma applanatum* is most often confused with other *Ganoderma* species. This indicates the model learned meaningful visual features rather than memorizing noise.',
            },
            {
              point: '**Augmentation experiments:** Compared no augmentation, standard augmentation, and heavy augmentation across model variants. Heavy augmentation on the xxtiny model showed an inverted accuracy gap (val > train), suggesting the augmentation was too aggressive for the smaller model.',
            },
          ],
          carousel: [
            { src: '/images/fungus-classifier/precision-recall.png', alt: 'Precision/recall plot', caption: 'Per-class precision and recall across 1,000 species' },
            { src: '/images/fungus-classifier/misclassification.png', alt: 'Top misclassified species', caption: 'Top misclassified species\u2014confusion follows taxonomic relationships' },
            { src: '/images/fungus-classifier/training-gcvitbase-phase4.png', alt: 'Training curves', caption: 'GCViT base training curves\u2014phase 4 (deepest unfreezing)' },
          ],
        },
        {
          heading: 'Mobile Deployment',
          body: [
            {
              point: '**TFLite conversion:** 433 MB Keras model \u2192 32 MB TFLite (~13.5x reduction) with DEFAULT quantization. TFLite metadata embedded for mobile runtime.',
            },
            {
              point: '**Kotlin/Android app:** Built on Google\'s LiteRT sample, customized with CameraX real-time inference, a Room SQLite database with 1,000-species metadata (common names, descriptions, lookalikes), model switching (GCViT + EfficientNet), and NNAPI delegate support.',
              sub: [
                'Jetpack Compose UI with MVVM architecture',
                'Adjustable confidence threshold and top-N results',
                'Fully offline\u2014no network required after installation',
              ],
            },
            {
              point: '**Earlier Flutter prototype:** The project started with a Flutter/TFLite proof-of-concept (215 species, MobileNetV3Large) before evolving to the Kotlin app with the full 1,000-species GCViT model.',
            },
          ],
        },
      ]}
      metrics={[
        {
          category: 'Data',
          items: [
            '194,258 images from iNaturalist across 1,000 fungal species',
            '~20,000 anomalous images filtered via DBSCAN outlier detection',
            'Species metadata scraped from iNaturalist (common names, descriptions, lookalikes)',
          ],
        },
        {
          category: 'Models',
          items: [
            '3 GCViT variants trained (xxtiny, tiny, base)',
            'TFLite deployment: 433 MB \u2192 32 MB with DEFAULT quantization',
            '1000\u00d71000 confusion matrix with per-class precision/recall evaluation',
          ],
        },
        {
          category: 'Code',
          items: [
            '~2,200 LOC Python (model architecture, training pipeline, evaluation, data curation)',
            '~1,450 LOC Kotlin (Android app with CameraX, Room DB, Jetpack Compose)',
            'Custom GCViT built from building blocks (attention, embedding, blocks, levels)',
          ],
        },
      ]}
    />
  )
}
