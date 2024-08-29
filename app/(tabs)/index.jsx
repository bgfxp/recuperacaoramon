import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity, Dimensions, Pressable, Modal } from 'react-native';

const cartas = [
  { id: 'MAG', nome: 'Mago Negro', poder: 2500, imagem: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgElLgD1x-P5lUVOs6DGGLwOg2g5TEJ_jkyYMhPgCYuogexhoodm0wrfXK9M_JFb95mB9FHj_5oaFy90w5H_Mz6u8YMxARHMGYvUIEuM1r5p4fkCa6XQTPMcSxyGcjA78y_URdaSZO9TqTDsHTWIER_9VCkfz3xq8RbXSjXOMFsTTv2x5PXmuydquG7kQ/w440-h640/Mago%20Negro.png' },
  { id: 'EXO', nome: 'Exódia', poder: 8000, imagem: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhuQOeRhdyHWYbQHMVoXiA82v9ecwVC9f-hhdrlkU7WfdLz2zT9ODNHMgObmTUhNArBLbaIVgDbIXSZrWHMhlUrIsNVXHyUMggWTUR1YPpZJJ5P_HyMvR8WoQrBwcJqqJFrSWWz6tiNNAt5NzMJYPh14moJtJUzxTLBI0vE9JAx18eWNDV9_a0_SA5raQ/w440-h640/1.png' },
  { id: 'REI', nome: 'Rei Caveira', poder: 3500, imagem: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgBH55gRcknhfXRseqKRPHstsZtrSSw6iO_2t391HAAjBHIQBWZjSllABMGDtg69BsFSa09VmgFuMj5spmIe5T2tFCm5CXPz-oa5XWr0N6F8_6UngjN8QOM-oSwzHljw66P8t0y__IxiFj6ynt4JVX37pT8_zJb5vv-fPVy4VQtAViNJRtXzgRxAZxtVQ/w440-h640/Rei%20Caveira.png' },
  { id: 'DRA', nome: 'Dragão Bebê', poder: 1000, imagem: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_KPxiY4waZHV0nmdm-iVE9IVCfQIANuLcufOI8-t6Ju9ymw_0ZuqYFF83f5_HtUDJ3jEH72QLyi1r9mNTJS-PuhdtrDttQ86DIKtb6HfIKpQJ2GRSzDYL7laQANi1rDavkjDh9RePobPg/w440-h640/BEBEDRAS.png' },
];

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10
  },
  cardSelectable: {
    borderColor: '#e67e22',
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    width: width * 0.4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedCard: {
    borderColor: '#2ecc71'
  },
  cardImage: {
    width: '100%',
    height: height * 0.2,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'contain'
  },
  cardContent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  selectButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
    marginVertical: 15,
    elevation: 4
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C3E50',
    opacity: 0.9,
    borderRadius: 20,
    padding: 20,
    width: '85%'
  },
  modalText: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  }
});

const App = () => {
  const [selectedPlayerCard, setSelectedPlayerCard] = useState(null);
  const [selectedOpponentCard, setSelectedOpponentCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resultado, setResultado] = useState('');

  const handleCardSelect = (card, isPlayer) => {
    if (isPlayer) {
      setSelectedPlayerCard(card);
    } else {
      setSelectedOpponentCard(card);
    }
  };

  const handlePlay = () => {
    if (selectedPlayerCard && selectedOpponentCard) {
      let result;
      if (selectedPlayerCard.poder > selectedOpponentCard.poder) {
        result = `${selectedPlayerCard.nome} vence com ${selectedPlayerCard.poder} pontos!`;
      } else if (selectedOpponentCard.poder > selectedPlayerCard.poder) {
        result = `${selectedOpponentCard.nome} vence com ${selectedOpponentCard.poder} pontos!`;
      } else {
        result = 'Empate!';
      }
      setResultado(result);
      setShowModal(true);
    } else {
      alert('Selecione uma carta para o jogador e uma para o oponente antes de jogar.');
    }
  };

  const clearInputs = () => {
    setSelectedPlayerCard(null);
    setSelectedOpponentCard(null);
    setResultado('');
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Escolha as Cartas</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Sua Carta</Text>
      <FlatList
        data={cartas}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.cardSelectable, selectedPlayerCard?.id === item.id && styles.selectedCard]}
            onPress={() => handleCardSelect(item, true)}
          >
            <Image style={styles.cardImage} source={{ uri: item.imagem }} />
            <Text style={styles.cardContent}>{item.nome}</Text>
            <Text style={styles.cardContent}>{item.poder}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      <Text style={{ fontSize: 18, marginVertical: 20 }}>Carta do Oponente</Text>
      <FlatList
        data={cartas}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.cardSelectable, selectedOpponentCard?.id === item.id && styles.selectedCard]}
            onPress={() => handleCardSelect(item, false)}
          >
            <Image style={styles.cardImage} source={{ uri: item.imagem }} />
            <Text style={styles.cardContent}>{item.nome}</Text>
            <Text style={styles.cardContent}>{item.poder}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      <Pressable style={styles.selectButton} onPress={handlePlay}>
        <Text style={styles.buttonText}>Jogar</Text>
      </Pressable>
      <Pressable style={styles.selectButton} onPress={clearInputs}>
        <Text style={styles.buttonText}>Limpar</Text>
      </Pressable>

      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{resultado}</Text>
          <Pressable style={styles.selectButton} onPress={() => setShowModal(false)}>
            <Text style={styles.buttonText}>Fechar</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default App;
