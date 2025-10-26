import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../Utils/Theme';

const TelaAvaliacoesFeedback = () => {
  const latestReviews = [
    { id: '1', client: 'João S.', rating: 5, comment: 'Excelente atendimento e cuidado com meu pet!', date: '2023-10-25' },
    { id: '2', client: 'Maria P.', rating: 4, comment: 'Gostei muito do serviço, mas o tempo de espera foi um pouco longo.', date: '2023-10-24' },
    { id: '3', client: 'Carlos R.', rating: 5, comment: 'Meu cachorro saiu feliz e cheiroso. Recomendo!', date: '2023-10-23' },
  ];

  const starDistribution = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  const recentFeedback = [
    { id: '1', client: 'Fernanda L.', rating: 5, comment: 'Profissionais muito atenciosos e ambiente impecável.', date: '2023-10-26' },
    { id: '2', client: 'Pedro G.', rating: 4, comment: 'Bom serviço, mas o agendamento online poderia ser mais intuitivo.', date: '2023-10-25' },
    { id: '3', client: 'Juliana M.', rating: 5, comment: 'Meu gato foi muito bem tratado, super recomendo!', date: '2023-10-24' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Avaliações e Feedback</Text>

      {/* Últimas avaliações dos clientes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Últimas avaliações dos clientes</Text>
        {latestReviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <Text style={styles.reviewClient}>{review.client} - <Text style={styles.reviewRating}>{'⭐'.repeat(review.rating)}</Text></Text>
            <Text style={styles.reviewComment}>{review.comment}</Text>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
        ))}
      </View>

      {/* Média geral */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Média Geral</Text>
        <View style={styles.averageRatingContainer}>
          <Text style={styles.averageRatingText}>⭐ 4.8 / 5</Text>
          <Text style={styles.totalReviewsText}>(Baseado em 125 avaliações)</Text>
        </View>
      </View>

      {/* Distribuição de estrelas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Distribuição de Estrelas</Text>
        {starDistribution.map((item) => (
          <View key={item.stars} style={styles.starDistributionRow}>
            <Text style={styles.starDistributionText}>{item.stars} Estrelas</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${item.percentage}%` }]} />
            </View>
            <Text style={styles.starDistributionPercentage}>{item.percentage}%</Text>
          </View>
        ))}
      </View>

      {/* Feedback recente */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feedback Recente</Text>
        {recentFeedback.map((feedback) => (
          <View key={feedback.id} style={styles.feedbackCard}>
            <Text style={styles.feedbackClient}>{feedback.client} - <Text style={styles.feedbackRating}>{'⭐'.repeat(feedback.rating)}</Text></Text>
            <Text style={styles.feedbackComment}>{feedback.comment}</Text>
            <Text style={styles.feedbackDate}>{feedback.date}</Text>
          </View>
        ))}
      </View>

      {/* Gráfico de Distribuição de Estrelas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gráfico de Distribuição</Text>
        <View style={styles.chartContainer}>
          {starDistribution.map((item) => (
            <View key={item.stars} style={styles.chartBarContainer}>
              <Text style={styles.chartBarLabel}>{item.stars}⭐</Text>
              <View style={styles.chartBarBackground}>
                <View style={[styles.chartBarFill, { height: `${item.percentage}%` }]} />
              </View>
              <Text style={styles.chartBarPercentage}>{item.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  reviewClient: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewRating: {
    color: '#FFD700', // Gold color for stars
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  averageRatingContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  averageRatingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  totalReviewsText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  starDistributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starDistributionText: {
    fontSize: 14,
    width: 80,
  },
  progressBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  starDistributionPercentage: {
    fontSize: 14,
    width: 40,
    textAlign: 'right',
  },
  feedbackCard: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  feedbackClient: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  feedbackRating: {
    color: '#FFD700', // Gold color for stars
  },
  feedbackComment: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  feedbackDate: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 150,
    paddingVertical: 10,
  },
  chartBarContainer: {
    alignItems: 'center',
  },
  chartBarLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
  chartBarBackground: {
    width: 20,
    height: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    justifyContent: 'flex-end',
  },
  chartBarFill: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  chartBarPercentage: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default TelaAvaliacoesFeedback;